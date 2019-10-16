import { Animation } from '@ionic/core';

export function showEnter(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {

    const backdropAnimation = new AnimationC()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.01, 0.6);

    const wrapperAnimation = new AnimationC()
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .beforeStyles({ opacity: 1 })
        .fromTo('translateY', 'calc(100vh - 200px)', '100px')
        // .fromTo('translateY', 'calc(0.7 * (100% + 100px) - 100px)', '100px')
        .fromTo('opacity', 1, 1);

    return Promise.resolve(new AnimationC()
        .addElement(baseEl)
        .easing('cubic-bezier(0.36, 0.66, 0.04, 1)')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

export function slideDownLeave(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {

    const backdropAnimation = new AnimationC()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.6, 0.0);

    const wrapperAnimation = new AnimationC()
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .fromTo('translateY', '100px', 'calc(100vh - 200px)')
        .fromTo('opacity', 1, 1);

    return Promise.resolve(new AnimationC()
        .addElement(baseEl)
        .easing('linear')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation)
    );
}

