import NavbarItem from 'app/layouts/navbar/navbar-item.model';

export const EntityNavbarItems: NavbarItem[] = [
  {
    name: 'User',
    route: '/user',
    translationKey: 'global.menu.entities.msUserUser',
  },
  {
    name: 'KeycloakUser',
    route: '/keycloak-user',
    translationKey: 'global.menu.entities.msUserKeycloakUser',
  },
  {
    name: 'Reel',
    route: '/reel',
    translationKey: 'global.menu.entities.msReelReel',
  },
  {
    name: 'Comment',
    route: '/comment',
    translationKey: 'global.menu.entities.msCommentlikeComment',
  },
  {
    name: 'Like',
    route: '/like',
    translationKey: 'global.menu.entities.msCommentlikeLike',
  },
  {
    name: 'Notification',
    route: '/notification',
    translationKey: 'global.menu.entities.msNotificationNotification',
  },
  {
    name: 'FeedItem',
    route: '/feed-item',
    translationKey: 'global.menu.entities.msFeedFeedItem',
  },
];
