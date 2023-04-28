import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# Comparators

Data Driven Forms provides basic mathematical comparators to compare values.

## greaterThan

```jsx
condition: {
  when: 'Foo',
  greaterThan: 10,
}
```

## greaterThanOrEqualTo

```jsx
condition: {
  when: 'Foo',
  greaterThanOrEqualTo: 10,
}
```

## lessThan

```jsx
condition: {
  when: 'Foo',
  lessThan: 10,
}
```

## lessThanOrEqualTo

```jsx
condition: {
  when: 'Foo',
  lessThanOrEqualTo: 10,
}
```

<CodeExample source="components/conditions/comparators" mode="preview" />

</DocPage>
