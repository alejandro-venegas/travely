import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    // Animate old page out
    query(
      ':leave',

      [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
          opacity: 1,
        }),
        animate(
          '0.3s ease-out',
          style({
            opacity: 0,
          })
        ),
      ],
      { optional: true }
    ),
    // Animate the new page in
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.3s ease-in', style({ opacity: 1 }))],
      {
        optional: true,
      }
    ),
  ]),
]);
