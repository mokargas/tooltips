import {useState} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';

function useBounds() {
  const ref = useRef();
  const [bounds, setBounds] = useState({});

  const set = () => setBounds(ref && ref.current ? ref.current.getBoundingClientRect() : {});

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return [bounds, ref];
}

export default useBounds;
