export interface CommandArgument<T> {
	name: string;
	description?: string;

	parse(input: string): T;
}

export class BaseArgument<T> implements CommandArgument<T> {
	name: string;
	description?: string;

	constructor(name: string, description?: string) {
		this.name = name;
		this.description = description;
	}

	parse(input: string): T {
		throw new Error("Method not implemented.");
	}
}

export class NumberArgument extends BaseArgument<number>{
	parse(input: string): number {
		return +input;
    }
}

export class StringArgument extends BaseArgument<string> {
	parse(input: string): string {
		return input;
    }
}

export class RegexArgument extends BaseArgument<RegExp> {
    parse(input: string): RegExp {
		return new RegExp(input);
    }
}

export class Command {
	
	name: string
	description?: string;
	arguments: Array<CommandArgument<any>>;
	callback: (...args: any[]) => void;

	private constructor(name: string, argument: Array<CommandArgument<any>>, callback: (...args: any[]) => void) {
		this.name = name;
		this.arguments = argument;
		this.callback = callback;
	}

	public static create(name: string, callback: (...args: any[]) => void): Command {
		return new Command(name, [], callback);
	}
	
	public describe(desc: string): Command {
		this.description = desc;
		return this;
	}

	public args(...args: Array<CommandArgument<any>>): Command {
		this.arguments.concat(args);
		return this;
	}

	public arg(arg: CommandArgument<any>): Command {
		this.arguments.push(arg);
		return this;
	}

	public execute(input: string[]) {
		const args = [];
		
		for (let i = 0; i < input.length; i++) {
			args.push(this.arguments[i].parse(input[i]));
		}

		this.callback(args);
	}
}
