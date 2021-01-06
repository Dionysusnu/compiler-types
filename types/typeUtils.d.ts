/// <reference no-default-lib="true"/>
/// <reference types="@rbxts/types"/>
/// <reference path="EslintIgnore.d.ts" />

/** Placeholder that sometimes helps force TS to display what you want it to. */
type _<T> = T;

/** Make all properties in T optional */
type Partial<T> = { [P in keyof T]?: T[P] };

/** Make all properties in T required */
type Required<T> = { [P in keyof T]-?: T[P] };

/** Make all properties in T readonly */
type Readonly<T> = { readonly [P in keyof T]: T[P] };

/** Make all properties in T non-readonly. */
type Writable<T> = { -readonly [P in keyof T]: T[P] };

/** From T pick a set of properties K */
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

/** Returns a subset of type T which excludes properties K */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** Construct a type with a set of properties K of type T */
type Record<K extends keyof any, T> = { [P in K]: T };

/** Exclude from T those types that are assignable to U */
type Exclude<T, U> = T extends U ? never : T;

/** Extract from T those types that are assignable to U */
type Extract<T, U> = T extends U ? T : never;

/** Returns a union of all the keys of T whose values extend from U */
type ExtractKeys<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

/** Returns a new object type of all the keys of T whose values extend from U */
type ExtractMembers<T, U> = Pick<T, ExtractKeys<T, U>>;

/** Returns a union of all the keys of T whose values do not extend from U */
type ExcludeKeys<T, U> = { [K in keyof T]: T[K] extends U ? never : K }[keyof T];

/** Returns a new object type of all the keys of T whose values do not extend from U */
type ExcludeMembers<T, U> = Pick<T, ExcludeKeys<T, U>>;

/** Exclude null and undefined from T */
type NonNullable<T> = unknown extends T ? defined : T extends null | undefined ? never : T;

/** Obtain the parameters of a function type in a `tuple | never`. */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/** Obtain the parameters of a constructor function type in a `tuple | never` */
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

/** Obtain the return type of a function type */
type ReturnType<T extends (...args: Array<any>) => any> = T extends (...args: Array<any>) => infer R ? R : any;

/** Obtain the return type of a constructor function type */
type InstanceType<T extends new (...args: Array<any>) => any> = T extends new (...args: Array<any>) => infer R
	? R
	: any;

/** Combines a series of intersections into one object, e.g. { x: number } & { y: number } becomes { x: number, y: number } */
type Reconstruct<T> = _<{ [K in keyof T]: T[K] }>;

/** Converts a series of object unions to a series of intersections, e.g. A | B becomes A & B */
type UnionToIntersection<U> = (U extends object ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/** Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter. */
type ThisParameterType<T> = T extends (this: infer U, ...args: Array<any>) => any ? U : unknown;

/** Removes the 'this' parameter from a function type. */
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
	? T
	: T extends (...args: infer A) => infer R
	? (...args: A) => R
	: T;

/** Given an object `T`, returns a unioned type of all non-readonly property names. */
type WritablePropertyNames<T> = {
	[K in keyof T]-?: T[K] extends Callback
		? never
		: (<F>() => F extends { [Q in K]: T[K] } ? 1 : 2) extends <F>() => F extends {
				-readonly [Q in K]: T[K];
		  }
				? 1
				: 2
		? K
		: never;
}[keyof T];

/** Given an object `T`, returns an object with readonly fields filtered out. */
type WritableProperties<T> = Pick<T, WritablePropertyNames<T>>;

/** Given an Instance `T`, returns a unioned type of all property names, except "ClassName". */
type InstancePropertyNames<T extends Instance> = Exclude<
	keyof T,
	ExtractKeys<T, RBXScriptSignal | Callback | symbol> | "ClassName" | "Changed" | "BreakJoints" | "MakeJoints"
>;

/** Given an Instance `T`, returns an object with methods and events filtered out. */
type InstanceProperties<T extends Instance> = Pick<T, InstancePropertyNames<T>>;

/** Given an Instance `T`, returns an object with readonly fields, methods, and events filtered out. */
type WritableInstanceProperties<T extends Instance> = WritableProperties<InstanceProperties<T>>;

type FilterNominalTags<T> = Pick<T, NonNominalKeys<T>>;
