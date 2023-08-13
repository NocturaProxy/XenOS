export class XenWM {
    private static windowCount: number = 0;

    CreateWindow(text: string): void {
        const div = document.createElement('div');
        const windowId = `xen-window-${XenWM.windowCount++}`;
        
        div.textContent = text;
        div.id = windowId;
        div.className = 'xen-window';
        
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => this.CloseWindow(windowId));
        
        div.appendChild(closeButton);
        
        document.body.appendChild(div);
        console.log('XenOS: Created new window with name', text);
    }

    CloseWindow(windowId: string): void {
        const windowElement = document.getElementById(windowId);
        if (windowElement) {
            windowElement.remove();
            console.log('XenOS: Closed window with ID', windowId);
        }
    }
}
