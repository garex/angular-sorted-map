var testables = ['Map', 'SortedMap']

for (var i = 0, iMax = testables.length; i < iMax; i++) {
  QUnit_Map(testables[i])
}

function QUnit_Map (testable) {
  var MapClass = garex[testable]

  QUnit.module(testable, {
    beforeEach: function () {
      this.map = new MapClass()
      this.filledMap = new MapClass()
      this.filledMap
        .put(1, 'one')
        .put('key', 'value')
        .put({key: 'key'}, {value: 2})
    }
  }, function () {
    QUnit.module('initially', function () {
      QUnit.test('has 0 size', function (assert) {
        assert.equal(0, this.map.size())
      })

      QUnit.test('is empty', function (assert) {
        assert.ok(this.map.isEmpty())
      })

      QUnit.test('does not contain keys', function (assert) {
        assert.notOk(this.map.containsKey(''))
        assert.notOk(this.map.containsKey('1'))
        assert.notOk(this.map.containsKey(1.0))
        assert.notOk(this.map.containsKey({}))
        assert.notOk(this.map.containsKey({q: 'w'}))
      })

      QUnit.test('does not contain values', function (assert) {
        assert.notOk(this.map.containsValue(''))
        assert.notOk(this.map.containsValue('1'))
        assert.notOk(this.map.containsValue(1.0))
        assert.notOk(this.map.containsValue({}))
        assert.notOk(this.map.containsValue({q: 'w'}))
      })
    })

    QUnit.module('containsKey', function () {
      QUnit.test('has literal keys in prefilled', function (assert) {
        assert.ok(this.filledMap.containsKey('key'))
        assert.ok(this.filledMap.containsKey(1))
      })

      QUnit.test('has object key in prefilled', function (assert) {
        assert.ok(this.filledMap.containsKey({key: 'key'}))
      })
    })

    QUnit.module('containsValue', function () {
      QUnit.test('has "value" in prefilled', function (assert) {
        assert.ok(this.filledMap.containsValue('value'))
      })

      QUnit.test('has "value2" in prefilled after key update', function (assert) {
        assert.ok(this.filledMap.put('key', 'value2').containsValue('value2'))
      })
    })

    QUnit.module('get', function () {
      QUnit.test('returns undefined for non-existent key', function (assert) {
        assert.strictEqual(undefined, this.map.get('unknown'))
      })

      QUnit.test('returns values for literals keys', function (assert) {
        assert.equal('value', this.filledMap.get('key'))
        assert.equal('one', this.filledMap.get(1))
      })

      QUnit.test('returns values for object keys', function (assert) {
        assert.deepEqual({value: 2}, this.filledMap.get({key: 'key'}))
      })

      QUnit.test('after adding value returns it', function (assert) {
        assert.ok(this.map.isEmpty())

        var value = {'key': 'value'}

        this.map
          .put('key', 'value1')
          .put('key', value)

        value['newkey'] = 'newvalue'

        assert.deepEqual(value, this.map.get('key'))
        assert.strictEqual(value, this.map.get('key'))
      })

      QUnit.test('returns value by key after deleting previous', function (assert) {
        this.filledMap.remove('key')
        assert.strictEqual('one', this.filledMap.get(1))
      })
    })

    QUnit.module('put', function () {
      QUnit.test('returns self', function (assert) {
        assert.strictEqual(this.map, this.map.put('key', 'value'))
        assert.strictEqual(this.map, this.map.put('key', 'value2'))
        assert.strictEqual(this.map, this.map.put('key', null))
      })

      QUnit.test('after adding new values changes size', function (assert) {
        this.map
          .put('key1', 'value')
          .put('key2', 'value')
        assert.equal(2, this.map.size())
        assert.notOk(this.map.isEmpty())
      })

      QUnit.test('after adding same key values size is same', function (assert) {
        assert.ok(this.map.isEmpty())

        this.map
          .put('key', 'value1')
          .put('key', 'value2')

        assert.equal(1, this.map.size())
        assert.notOk(this.map.isEmpty())
      })

      QUnit.test('can accept custom entry in single param mode', function (assert) {
        var entry = new garex.MapEntry('key', 'value')
        this.map.put(entry)
        assert.equal(1, this.map.size())
        assert.equal('value', this.map.get('key'))
        assert.equal('value', this.map.entries[0].value)
        entry.setValue('wtf')
        assert.equal('wtf', this.map.entries[0].value)
      })
    })

    QUnit.module('remove', function () {
      QUnit.test('returns undefined for non-existent key', function (assert) {
        assert.strictEqual(undefined, this.map.remove('key'))
      })

      QUnit.test('changes size on existent values', function (assert) {
        var size = this.filledMap.size()
        assert.notOk(this.filledMap.isEmpty())

        this.filledMap.remove('key')
        assert.equal(--size, this.filledMap.size())

        this.filledMap.remove(1)
        assert.equal(--size, this.filledMap.size())

        this.filledMap.remove({key: 'key'})
        assert.equal(--size, this.filledMap.size())
      })
    })

    QUnit.module('clear', function () {
      QUnit.test('returns self', function (assert) {
        assert.strictEqual(this.map, this.map.clear())
      })

      QUnit.test('becomes empty after', function (assert) {
        assert.notOk(this.filledMap.isEmpty(), 'Filled map is not empty')
        this.filledMap.clear()
        assert.ok(this.filledMap.isEmpty())
      })
    })

    QUnit.module('keys', function () {
      QUnit.test('contains same objects', function (assert) {
        assert.strictEqual(1, this.filledMap.keys[0])
        assert.strictEqual('key', this.filledMap.keys[1])
        assert.deepEqual({key: 'key'}, this.filledMap.keys[2])
        assert.propEqual({key: 'key'}, this.filledMap.keys[2])
      })
    })
  })
}
