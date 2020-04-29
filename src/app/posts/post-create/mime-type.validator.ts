import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';

export const mimeType = (
  control: AbstractControl
): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create((observable: Observer<{[key: string]: any}>) => {
    fileReader.addEventListener("loadend", () => {

    });
    fileReader.readAsArrayBuffer(file);
  });
};
