export class XenWM {
    CreateWindow(text: string): void {
        const div = document.createElement('div');
        div.textContent = text;
        document.body.appendChild(div);
    }
}
