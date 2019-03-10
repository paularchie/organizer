import { AppState } from '../../reducers';
import { currentUser } from '../../auth/state/auth.selectors';
import {
    Directive,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef
    } from '@angular/core';
import { intersection } from 'lodash';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../../../../common/models/user.model';




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
        store: Store<AppState>) {

        this.subscription = store.pipe(
            select(currentUser)
        ).subscribe(
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











