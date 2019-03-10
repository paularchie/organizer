import { routes } from './auth-routing.module';
import { SignupComponent } from './components/signup/signup.component';

describe('AuthRoutingModule', () => {

    it('should contain a route for /signup', () => {
        expect(routes).toContain({ path: 'signup', component: SignupComponent })
    });

    
});