import { Observable } from 'rxjs';

export interface NavigationItemProps {
    name: string;
    url?: string;
    clickHandler?: Function;
    authenticationState?: Observable<boolean>;
    roles?: string[];
}
