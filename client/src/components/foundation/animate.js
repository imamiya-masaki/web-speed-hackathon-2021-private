import giflef, { Animator, Decoder } from 'gifler';
import { GifReader } from 'omggif';
export default null;
const worker = self;
worker.addEventListener('message', ({data}) => {
    const reader = new GifReader(new Uint8Array(data));
    const frames = Decoder.decodeFramesSync(reader);
    worker.postMessage(frames)
})