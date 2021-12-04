import fj, {
  ObjectSchema,
  Options,
  Schema,
  StringSchema,
  IntegerSchema,
  NumberSchema,
  NullSchema,
  BooleanSchema,
  ArraySchema,
  TupleSchema,
} from 'fast-json-stringify';

type TypeCond<S extends Partial<Schema>> = S extends Partial<infer P>
  ? P extends Record<'anyOf', infer A>
    ? TypeAnyOf<A>
    : P extends StringSchema
    ? TypeString<P>
    : P extends IntegerSchema | NumberSchema
    ? number
    : P extends BooleanSchema
    ? boolean
    : P extends NullSchema
    ? null
    : P extends Record<'type', 'object'>
    ? TypeObject<P>
    : P extends ArraySchema
    ? TypeCond<Partial<P['items']>>[]
    : P extends TupleSchema
    ? unknown[]
    : unknown
  : never;

type TypeAnyOf<S> = S extends Array<infer P> ? (P extends P ? TypeCond<P> : never) : never;

type TypeString<S extends StringSchema> = S extends {
  type: 'string';
  format: string;
}
  ? Date
  : string;

type TypeObject<S extends Record<'type', 'object'>> = S extends {
  properties?: infer P;
}
  ? {
      [K in keyof P]?: P[K] extends ObjectSchema ? TypeObject<NonNullable<P[K]>> : TypeCond<P[K]>;
    }
  : never;

function fastJson<S extends Schema>(
  schema: S,
  options?: Options,
): (doc: TypeCond<S>) => TypeCond<S> extends null ? 'null' : string;

function fastJson<S>(schema: S, options?: Options) {
  return fj(schema, options);
}

export default fastJson;
