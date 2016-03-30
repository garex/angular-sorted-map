QUnit.module('MapEntry', function () {
  QUnit.test('has undefined key and value initially', function (assert) {
    var entry = new garex.MapEntry()
    assert.strictEqual(undefined, entry.key)
    assert.strictEqual(undefined, entry.value)
  })

  QUnit.test('has different keys', function (assert) {
    var entry1 = new garex.MapEntry(1),
      entry2 = new garex.MapEntry(2)

    assert.strictEqual(1, entry1.key)
    assert.strictEqual(2, entry2.key)
  })

  QUnit.test('has different values', function (assert) {
    var entry1 = new garex.MapEntry('', 1),
      entry2 = new garex.MapEntry('', 2)

    assert.strictEqual(1, entry1.value)
    assert.strictEqual(2, entry2.value)
  })

  QUnit.test('can change value', function (assert) {
    var entry = new garex.MapEntry('', 1)

    assert.equal(1, entry.value)
    assert.equal(2, entry.setValue(2).value)
  })
})
