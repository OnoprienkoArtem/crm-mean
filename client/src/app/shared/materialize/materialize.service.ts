import { ElementRef } from '@angular/core';

declare let M: any;

export interface MaterializeInstance {
  open(): void;
  close(): void;
  destroy(): void;
}

export interface MaterializeDatepicker extends MaterializeInstance {
  date?: Date;
}

export class MaterializeService {
  static toast(message: string): void {
    M.toast({ html: message });
  }

  static initializeFloatingButton(ref: ElementRef): void {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateTextInputs(): void {
    M.updateTextFields();
  }

  static initModal(ref: ElementRef): MaterializeInstance {
    return M.Modal.init(ref.nativeElement);
  }

  static initTooltip(ref: ElementRef): MaterializeInstance {
    return M.Tooltip.init(ref.nativeElement);
  }

  static initDatepicker(ref: ElementRef, onClose: () => void): MaterializeDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
    });
  }
}
