import {AbstractControl, FormGroup} from '@angular/forms';
import { ɵConsole } from '@angular/core';

export function passwordValidator(control : AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
        const confirmPassword = control.value;

        const passwordControl = control.root.get('password');

        if(passwordControl){
            const passwordValue = passwordControl.value;
            if(passwordValue !== confirmPassword){
                return {
                    isError : true
                }
            }
        }
    }

    return null;
};
