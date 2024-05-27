import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { InputErrorComponent } from './input-error/input-error.component';
@NgModule({
    imports: [CommonModule],
    declarations: [
        LoadingComponent,
        MessagePanelComponent,
        InputErrorComponent
    ],
    exports: [
        LoadingComponent,
        MessagePanelComponent,
        InputErrorComponent
    ]
})
export class ComponentsModule { }
