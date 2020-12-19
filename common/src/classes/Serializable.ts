/**
 * Should be used on all classes that can be serialized
 */
export abstract class Serializable {
  abstract serialize(): any;
  abstract unserialize(val: any): any;
}
