import * as React from 'react';
import { cn } from '@/lib/utils';

const ProfileCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col items-center rounded-xl border bg-card text-center text-card-foreground shadow-sm',
      className,
    )}
    {...props}
  />
));
ProfileCard.displayName = 'ProfileCard';

const ProfileCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col items-center space-y-1.5 p-6', className)}
    {...props}
  />
));
ProfileCardHeader.displayName = 'ProfileCardHeader';

const ProfileCardAvatar = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt, ...props }, ref) => (
  <div className="-mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm">
    <img
      ref={ref}
      alt={alt || 'Avatar'}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  </div>
));
ProfileCardAvatar.displayName = 'ProfileCardAvatar';

const ProfileCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'mt-4 text-xl leading-none font-semibold tracking-tight',
      className,
    )}
    {...props}
  />
));
ProfileCardTitle.displayName = 'ProfileCardTitle';

const ProfileCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
ProfileCardDescription.displayName = 'ProfileCardDescription';

const ProfileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('w-full p-6 pt-0', className)} {...props} />
));
ProfileCardContent.displayName = 'ProfileCardContent';

const ProfileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex w-full items-center justify-center p-6 pt-0',
      className,
    )}
    {...props}
  />
));
ProfileCardFooter.displayName = 'ProfileCardFooter';

export {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardAvatar,
  ProfileCardTitle,
  ProfileCardDescription,
  ProfileCardContent,
  ProfileCardFooter,
};
