import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-message-panel',
    standalone: false,
    templateUrl: './message-panel.component.html',
    styleUrl: './message-panel.component.scss'
})
export class MessagePanelComponent {
    @Input() message: string | null = '';
    @Input() level: "info" | "error" | "warn" = 'info';

}
