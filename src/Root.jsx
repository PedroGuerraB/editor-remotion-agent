import { Composition } from 'remotion';
import { CTAAnimation } from './CTAAnimation';
import { CTAAnimationV2 } from './CTAAnimationV2';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="CTA"
        component={CTAAnimation}
        durationInFrames={420}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CTA-V2"
        component={CTAAnimationV2}
        durationInFrames={420}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
