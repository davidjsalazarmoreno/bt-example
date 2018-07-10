import { Component, OnInit, Input, Output, EventEmitter, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IExchange {
  currencies: { from: string, to: string };
  config: {
    direction: Array<string>;
  };
}

@Component({
  selector: 'app-exchanges-selector',
  templateUrl: './exchanges-selector.component.html',
  styleUrls: ['./exchanges-selector.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExchangesSelectorComponent),
      multi: true
    }
  ]
})
export class ExchangesSelectorComponent implements OnInit, ControlValueAccessor {
  @Input() exchanges: Array<IExchange>;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  private _selected = '';
  private readonly _selector = '.exchanges-selector';

  constructor(
    private _elementRef: ElementRef,
  ) { }

  ngOnInit() {}

  get selected() {
    return this._selected;
  }

  set selected(value) {
    if (this.selected !== value) {
      this._selected = value;
      this._onChange(value);
      this._onTouched(value);
    }
  }

  writeValue(selected): void {
    if (selected !== this._selected) {
      this._selected = selected;
    }
  }

  registerOnChange(fn: (_selected) => void) {
    this._onChange = fn;
  }

  registerOnTouched(fn: (_selected) => void) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled) {
    const { _selector, querySelectorNativeElement } = this;
    const selectElement: HTMLInputElement = querySelectorNativeElement(_selector);
    const disabledAttributeKey = 'disabled';

    if (!selectElement) {
      return;
    }

    if (isDisabled) {
      selectElement.setAttribute(disabledAttributeKey, disabledAttributeKey);
    } else {
      selectElement.removeAttribute(disabledAttributeKey);
    }
  }

  private _onChange(_selected) {}
  private _onTouched(_selected) {}

  // DOM utils

  querySelectorNativeElement(selector: string): HTMLInputElement {
    const selectElement: HTMLInputElement = this._elementRef.nativeElement.querySelector(selector);
    return selectElement;
  }

  // Events
  onChange() {
    this.change.emit();
  }

}
