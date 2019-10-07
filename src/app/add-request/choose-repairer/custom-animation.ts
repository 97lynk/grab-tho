import { Animation } from '@ionic/core';

export function scaleUpEnter(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {
    const baseAnimation = new AnimationC();

    const wrapperAnimation = new AnimationC();
    wrapperAnimation
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .beforeStyles({ opacity: 1 })
        .fromTo('translateY', '70%', '100px')
        // .fromTo('translateY', 'calc(0.7 * (100% + 100px) - 100px)', '100px')
        .fromTo('opacity', 1, 1);

    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36, 0.66, 0.04, 1)')
        .duration(200)
        .add(wrapperAnimation));
}

export function scaleUpLeave(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {

    const baseAnimation = new AnimationC();

    const wrapperAnimation = new AnimationC();

    wrapperAnimation
        .addElement(baseEl.querySelector('.modal-wrapper'))
        // .fromTo('translateY', '100px', 'calc(0.7 * (100% + 100px))')
        .fromTo('translateY', '100px', '70%')
        .fromTo('opacity', 1, 1);

    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('linear')
        .duration(200)
        .add(wrapperAnimation)
    );
}

