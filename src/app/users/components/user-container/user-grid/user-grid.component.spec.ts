import { UserGridComponent } from "./user-grid.component";
import { EventEmitter } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { UserContainerComponent } from "../user-container.component";
import { UsersFacade } from "../../../users-facade.service";
import { of } from "rxjs";


describe('UserGrid', () => {
    let userContainerComponent: UserContainerComponent;
    let userGridComponent: UserGridComponent;
    let facade: UsersFacade;

    beforeEach(() => {
        const facade =
            jasmine.createSpyObj('UsersFacade', ['test']);

        facade.test.and.returnValue([{ id: 1 }])

        userGridComponent = new UserGridComponent();
        userContainerComponent = new UserContainerComponent(null, facade);

        userContainerComponent.ngOnInit();

        console.log('!!!1', userGridComponent.users);
        // expect();
    //    facade.users$().subscribe(x => console.log('11111', x[0].id))
    });

    it('Should receive User array through input', () => {
        // console.log('!!!!!!!', facade.users$)
        expect(true);
    })

    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         declarations: [
    //             UserGridComponent
    //         ],
    //     }).compileComponents();
    // }));

    // it(`should emit 'editUser' event`, () => {
    //     const fixture = TestBed.createComponent(UserGridComponent);
    //     // fixture.detectChanges();
    //     // const compiled = fixture.debugElement.nativeElement;
    //     // const button = compiled.querySelector('button');
    //     // component.editUser.subscribe

    //     // console.log('!!!!!!', button);

    //     expect(true)
    // });
})

