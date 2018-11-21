


import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { intersection } from 'lodash';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Directive({
    selector: '[rbacAllow]'
})
export class RbacAllowDirective implements OnDestroy {

    allowedRoles: string[];
    user: User;

    subscription: Subscription;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService) {

        this.subscription = authService.user$.subscribe(
            user => {
                this.user = user;
                this.showIfUserAllowed();
            });
    }

    @Input()
    set rbacAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;
        this.showIfUserAllowed();
    }

    showIfUserAllowed() {

        if (!this.allowedRoles || this.allowedRoles.length === 0 || !this.user) {
            return this.viewContainer.clear();
        }

        const isUserAllowed = intersection(this.allowedRoles, this.user.roles).length > 0;

        if (isUserAllowed) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}











