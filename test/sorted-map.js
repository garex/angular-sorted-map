QUnit.module('SortedMap', {
  beforeEach: function () {
    this.filledMap = new garex.SortedMap()
    this.filledMap
      .put('a', null)
      .put('z', 'z')
      .put('p', 'p')

    this.filledMap.remove('a')
    this.filledMap.put('a', 'a')
  }
}, function () {
  QUnit.module('put', function () {
    QUnit.test('after adding keys sorted', function (assert) {
      assert.deepEqual(this.filledMap.keys, ['a', 'p', 'z'])
    })

    QUnit.test('after adding values sorted', function (assert) {
      assert.deepEqual(this.filledMap.values, ['a', 'p', 'z'])
    })

    QUnit.test('after adding entries sorted', function (assert) {
      assert.equal(this.filledMap.entries[0].key, 'a')
      assert.equal(this.filledMap.entries[2].key, 'z')
    })
  })
})
