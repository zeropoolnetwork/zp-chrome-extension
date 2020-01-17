import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from '@angular/animations';

const optional = {optional: true};

export const animateFunc =
  trigger('routeAnimations', [
    transition('new => import', fader()),
    transition('import => new', slideLeft()),
    transition('import => unlock', slideLeft()),
    transition('new => create', slideRight()),
    transition('create => new', slideLeft()),
    transition('create => password', slideRight()),
    transition('password => create', slideLeft()),
    transition('password => repeat', slideRight()),
    transition('repeat => password', slideLeft()),
    transition('repeat => main', fader()),
    transition('main => menu', slideLeft()),
    transition('menu => main', slideRight()),
    transition('main <=> deposit', fader()),
    transition('main <=> withdraw', fader()),
    transition('main <=>send', fader()),
    transition('menu => password', slideRight()),
    transition('password => menu', slideLeft()),
    transition('menu => delete', slideRight()),
    transition('delete => menu', slideLeft()),
    transition('password => mnemonic', slideRight()),
    transition('mnemonic => password', slideLeft()),
    transition('mnemonic => main', fader()),
    transition('import => password', slideRight()),
    transition('password => import', slideLeft()),
    transition('unlock <=> main', fader()),
    transition('unlock <=> new', fader()),
  ]);

export function fader() {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        opacity: 0
      }),
    ], optional),
    query(':enter', [
      animate('200ms ease-in-out', style({ opacity: 1 })),
    ], optional)
  ];
}

export function slideLeft() {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: 360,
        height: 590,
      })
    ], optional),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('300ms ease-in-out', style({ left: '100%'}))
      ], optional),
      query(':enter', [
        animate('300ms ease-in-out', style({ left: '0%'}))
      ])
    ])
  ];
}

export function slideRight() {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        right: 0,
        width: 360,
        height: 590,
      })
    ], optional),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('300ms ease-in-out', style({ right: '100%'}))
      ], optional),
      query(':enter', [
        animate('300ms ease-in-out', style({ right: '0%'}))
      ])
    ])
  ];
}

