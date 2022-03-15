import '@emotion/react';

declare module '@emoion/react' {
    export interface Theme extends Record<string, any> {
        colors:{
            primary: string;
            gray: {
                [key: number]: string;

            }
            white: string;
        }
    }
}