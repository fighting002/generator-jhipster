import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';

import { PasswordResetInit } from './password-reset-init.service';

@Component({
    selector: '<%=jhiPrefix%>-password-reset-init',
    templateUrl: './password-reset-init.component.html'
})
export class PasswordResetInitComponent implements OnInit {
    error: string;
    errorEmailNotExists: string;
    resetAccount: any;
    success: string;

    constructor(
        <%_ if (enableTranslation) { _%>
        private jhiLanguageService: JhiLanguageService,
        <%_ } _%>
        private passwordResetInit: PasswordResetInit, 
        private elementRef: ElementRef, private renderer: Renderer) {
        <%_ if (enableTranslation) { _%>
        this.jhiLanguageService.setLocations(['reset']);
        <%_ } _%>
    }

    ngOnInit() {
        this.resetAccount = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);
    }

    requestReset () {

        this.error = null;
        this.errorEmailNotExists = null;

        this.passwordResetInit.save(this.resetAccount.email).subscribe(() => {
            this.success = 'OK';
        }, (response) => {
            this.success = null;
            if (response.status === 400 && response.data === 'e-mail address not registered') {
                this.errorEmailNotExists = 'ERROR';
            } else {
                this.error = 'ERROR';
            }
        });
    }
}
