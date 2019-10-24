/**
 * Should be used on all classes that can be serialized
 */
export interface ISerializable<Unserialized, Serialized> {
  serialize(): Serialized;
  // this is optional because of the weirdness with static methods in typescript!
  unserialize?: (val: Serialized) => Unserialized;
}
