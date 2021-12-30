import {h} from 'preact';
/**
 * @typedef {object} Props
 * @property {number} aspectHeight
 * @property {number} aspectWidth

 */

/**
 * 親要素の横幅を基準にして、指定したアスペクト比のブロック要素を作ります

 */
const AspectRatioBox = ({ aspectHeight, aspectWidth, children }) => {


  return (
    <div className="relative w-full h-1" style={{ height: 'auto', paddingTop: (aspectHeight/aspectWidth)*100+'%' }}>
      {/* 高さが計算できるまで render しない */}
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

export { AspectRatioBox };
