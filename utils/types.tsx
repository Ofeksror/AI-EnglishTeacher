export interface Message {
    isUser: boolean;
    message: string;
    corrections?: any[]; // Update to either a string or an HTML component
    improvements?: any[]; // Update to either a string or an HTML component
}