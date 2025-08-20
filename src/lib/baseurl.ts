export class BaseUrl {
    private static readonly domain = "sites.google.com/view/ausoetcse/";
    private static readonly protocol = "https://";

    public static get base(): string {
        return `${this.protocol}${this.domain}`;
    }
}