export interface CommandArgument<T> {
	parse(input: string): T;
}

export class NumberArgument implements CommandArgument<number> {
    parse(input: string): number {
		return +input;
    }
}

export class StringArgument implements CommandArgument<string> {
    parse(input: string): string {
		return input;
    }
}

export class RegexArgument implements CommandArgument<RegExp> {
    parse(input: string): RegExp {
    }
}

export interface Command {
	name: string;
	arguments: Array<CommandArgument<any>>;
	callback: (...args: any[]) => void;
}

let a: Command = {
	name: "create",
	arguments: [new NumberArgument(), new StringArgument()],
	callback: (num, str) => {

	}
}
