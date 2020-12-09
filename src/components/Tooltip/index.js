import React, {useState, useEffect} from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import {Positions, Alignments} from './constants';
import useWindowWidth from 'helpers/useWindowWidth';
import useBounds from 'helpers/useBounds';

import Measure from 'react-measure';

import Styles from './Tooltip.module.scss';

function Tooltip({children, title, tooltipClass, tooltipId = uuidv4(), position, ...rest}) {
  const windowWidth = useWindowWidth();
  const [bounds, ref] = useBounds();
  const [childBounds, setChildBounds] = useState(0);

  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(Alignments.CENTER);

  const handleDismiss = () => setVisible(false);
  const handleShow = () => setVisible(true);

  useEffect(() => {
    window.addEventListener('scroll', handleDismiss);
    window.addEventListener('resize', handleDismiss);

    return () => {
      window.removeEventListener('scroll', handleDismiss);
      window.removeEventListener('resize', handleDismiss);
    };
  }, []);

  useEffect(() => {
    const {left, width, right} = bounds;

    if (left - width / 2 <= 0) {
      setOffset(Alignments.LEFT);
    } else if (right - width / 2 >= windowWidth) {
      setOffset(Alignments.RIGHT);
    } else {
      setOffset(Alignments.CENTER);
    }
  }, [windowWidth, bounds]);

  const defaultStyles = [
    Styles.content,
    Styles[`${position}`],
    Styles[`content-${offset}`],
    tooltipClass,
  ];

  return (
    <span id={tooltipId} className={Styles.wrapper} role="tooltip" aria-hidden={!visible} {...rest}>
      <span
        ref={ref}
        className={
          visible ? clsx(...[defaultStyles, Styles['content-visible']]) : clsx(...defaultStyles)
        }
        style={{
          marginLeft: offset === Alignments.CENTER ? -bounds.width / 2 : 0,
          ...(position === Positions.TOP && {
            bottom: `${childBounds.height}px`,
          }),
          ...(position === Positions.BOTTOM && {
            top: `${childBounds.height}px`,
          }),
        }}
      >
        <span className={clsx(Styles['arrow-container'], Styles[`arrow-container-${offset}`])}>
          <span className={Styles[`arrow-${position}`]} />
        </span>
        <span className={Styles.title}>{title}</span>
      </span>

      <Measure bounds onResize={({bounds}) => setChildBounds(bounds)}>
        {({measureRef}) => (
          <span
            ref={measureRef}
            className={Styles['child-container']}
            onTouchStart={handleShow}
            onTouchEnd={handleDismiss}
            onMouseEnter={handleShow}
            onMouseLeave={handleDismiss}
            aria-describedby={tooltipId}
          >
            {children}
          </span>
        )}
      </Measure>
    </span>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(Object.values(Positions)),
  title: PropTypes.string.isRequired,
  tooltipClass: PropTypes.string,
  tooltipId: PropTypes.string,
};

Tooltip.defaultProps = {
  position: Positions.BOTTOM,
  title: 'A Tooltip',
};

export default Tooltip;
