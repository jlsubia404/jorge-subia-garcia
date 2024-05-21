import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
@NgModule({
    imports: [CommonModule],
    declarations: [
        LoadingComponent,
        MessagePanelComponent
    ],
    exports: [
        LoadingComponent,
        MessagePanelComponent
    ]
})
export class ComponentsModule { }
