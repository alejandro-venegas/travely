import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
const leftFinalState = style({
  height: '15rem',
  opacity: 0,
  transform: 'translateX(-10vw)',

  width: 0,
});
const centerFinalState = style({
  transform: 'translateX(0)',
  height: '*',
  width: '*',
});
const rightFinalState = style({
  height: '15rem',
  opacity: 0,

  transform: 'translateX(10vw)',

  width: 0,
});

export const formFade = trigger('stepper', [
  state('left', leftFinalState),
  state('center', centerFinalState),
  state('right', rightFinalState),
  transition('void => *', []),
  transition(
    '* => left',
    group([
      animate(200, style({ opacity: 0 })),
      animate(
        300,
        style({
          height: '230px',
          transform: 'translateX(-10vw)',
        })
      ),
    ])
  ),
  transition(
    '* => right',
    group([
      animate(200, style({ opacity: 0 })),
      animate(
        300,
        style({
          height: '230px',
          transform: 'translateX(10vw)',
        })
      ),
    ])
  ),
  transition('* => center', [
    style({ overflow: 'hidden' }),
    animate(300, style({ height: '*' })),
    style({ width: '*', transform: 'unset' }),
    group([animate('200ms', style({ opacity: 1 }))]),
  ]),
]);
