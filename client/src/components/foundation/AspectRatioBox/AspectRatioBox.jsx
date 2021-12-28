import React from 'react';

/**
 * @typedef {object} Props
 * @property {number} aspectHeight
 * @property {number} aspectWidth
 * @property {React.ReactNode} children
 */

/**
 * 親要素の横幅を基準にして、指定したアスペクト比のブロック要素を作ります
 * @type {React.VFC<Props>}
 */
const AspectRatioBox = ({ aspectHeight, aspectWidth, children }) => {
  /** @type {React.RefObject<HTMLDivElement>} */
  const ref = React.useRef(null);
  const [clientHeight, setClientHeight] = React.useState(0);

  // React.useEffect(() => {
  //   // clientWidth とアスペクト比から clientHeight を計算する
  //   function calcStyle() {
  //     const clientWidth = ref.current.clientWidth;
  //     console.log('calcStyple', ref, clientWidth, aspectWidth, aspectHeight);
  //     setClientHeight((clientWidth / aspectWidth) * aspectHeight);
  //   }
  //   calcStyle()

  //   // ウィンドウサイズが変わるたびに計算する
  //   window.addEventListener('resize', calcStyle, { passive: false });
  //   return () => {
  //     window.removeEventListener('resize', calcStyle);
  //   };
  // }, [aspectHeight, aspectWidth]);

  return (
    <div className="relative w-full h-1" style={{ height: 'auto', paddingTop: (aspectHeight/aspectWidth)*100+'%' }}>
      {/* 高さが計算できるまで render しない */}
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

export { AspectRatioBox };
