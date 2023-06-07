import { addScream, hello } from "./stub-called";

function double(str: string): string
{
    return str + str;
}

export function testCall(lastSymbol: string = ''): string
{
    return double(addScream(hello)) + lastSymbol;
}