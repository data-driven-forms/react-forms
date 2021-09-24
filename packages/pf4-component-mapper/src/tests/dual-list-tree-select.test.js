import { convertOptions } from '../dual-list-tree-select';
import { selectedOptions } from '../dual-list-tree-select/dual-list-tree-select';
import { getValueFromSelected } from '../dual-list-tree-select/dual-list-tree-select';

describe('DualListTreeSelect', () => {
  const options = [
    {
      label: 'bb',
      hasBadge: true,
      badgeProps: {
        isRead: true,
      },
      children: [
        {
          value: 'value1',
          label: 'c',
        },
        {
          value: 'value2',
          label: 'a',
        },
        {
          label: 'Folder 2',
          children: [
            {
              label: 'value 3',
              value: 'value 3',
            },
          ],
        },
      ],
    },
    {
      label: 'aaa',
      hasBadge: true,
      badgeProps: {
        isRead: true,
      },
      children: [
        {
          value: 'value12',
          label: 'a',
        },
        {
          value: 'value23',
          label: 'z',
        },
        {
          value: 'value231',
          label: 't',
        },
        {
          label: 'Folder 2',
          children: [
            {
              label: 'xsd',
              value: 'zsadas',
            },
          ],
        },
      ],
    },
  ];

  it('getValueFromSelected', () => {
    expect(getValueFromSelected(options)).toEqual(['value1', 'value2', 'value 3', 'value12', 'value23', 'value231', 'zsadas']);
  });

  it('getValueFromSelected - empty array', () => {
    expect(getValueFromSelected([])).toEqual([]);
  });

  describe('selectedOptions', () => {
    it('empty array', () => {
      expect([]).toEqual([]);
    });

    it('get selected', () => {
      const result = selectedOptions(options, ['value 3', 'value12'], true);
      expect(result).toEqual([
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              children: [
                {
                  label: 'value 3',
                  value: 'value 3',
                },
              ],
              label: 'Folder 2',
            },
          ],
          hasBadge: true,
          label: 'bb',
        },
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              label: 'a',
              value: 'value12',
            },
          ],
          hasBadge: true,
          label: 'aaa',
        },
      ]);
      expect(getValueFromSelected(result)).toEqual(['value 3', 'value12']);
    });

    it('get usselected', () => {
      const result = selectedOptions(options, ['value 3', 'value12'], false);
      expect(result).toEqual([
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              label: 'c',
              value: 'value1',
            },
            {
              label: 'a',
              value: 'value2',
            },
          ],
          hasBadge: true,
          label: 'bb',
        },
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              label: 'z',
              value: 'value23',
            },
            {
              label: 't',
              value: 'value231',
            },
            {
              children: [
                {
                  label: 'xsd',
                  value: 'zsadas',
                },
              ],
              label: 'Folder 2',
            },
          ],
          hasBadge: true,
          label: 'aaa',
        },
      ]);
      expect(getValueFromSelected(result)).toEqual(['value1', 'value2', 'value23', 'value231', 'zsadas']);
    });
  });

  describe('convertOptions', () => {
    it('empty array', () => {
      expect(convertOptions([])).toEqual([]);
    });

    it('converts DDF options to tree data', () => {
      expect(convertOptions(options)).toEqual([
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              id: 'value1',
              isChecked: false,
              label: 'c',
              text: 'c',
              value: 'value1',
            },
            {
              id: 'value2',
              isChecked: false,
              label: 'a',
              text: 'a',
              value: 'value2',
            },
            {
              children: [
                {
                  id: 'value 3',
                  isChecked: false,
                  label: 'value 3',
                  text: 'value 3',
                  value: 'value 3',
                },
              ],
              id: 'Folder 2',
              isChecked: false,
              label: 'Folder 2',
              text: 'Folder 2',
            },
          ],
          hasBadge: true,
          id: 'bb',
          isChecked: false,
          label: 'bb',
          text: 'bb',
        },
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              id: 'value12',
              isChecked: false,
              label: 'a',
              text: 'a',
              value: 'value12',
            },
            {
              id: 'value23',
              isChecked: false,
              label: 'z',
              text: 'z',
              value: 'value23',
            },
            {
              id: 'value231',
              isChecked: false,
              label: 't',
              text: 't',
              value: 'value231',
            },
            {
              children: [
                {
                  id: 'zsadas',
                  isChecked: false,
                  label: 'xsd',
                  text: 'xsd',
                  value: 'zsadas',
                },
              ],
              id: 'Folder 2',
              isChecked: false,
              label: 'Folder 2',
              text: 'Folder 2',
            },
          ],
          hasBadge: true,
          id: 'aaa',
          isChecked: false,
          label: 'aaa',
          text: 'aaa',
        },
      ]);
    });

    it('converts DDF options to tree data and sorts ASC', () => {
      expect(convertOptions(options, 'asc')).toEqual([
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              id: 'value12',
              isChecked: false,
              label: 'a',
              text: 'a',
              value: 'value12',
            },
            {
              children: [
                {
                  id: 'zsadas',
                  isChecked: false,
                  label: 'xsd',
                  text: 'xsd',
                  value: 'zsadas',
                },
              ],
              id: 'Folder 2',
              isChecked: false,
              label: 'Folder 2',
              text: 'Folder 2',
            },
            {
              id: 'value231',
              isChecked: false,
              label: 't',
              text: 't',
              value: 'value231',
            },
            {
              id: 'value23',
              isChecked: false,
              label: 'z',
              text: 'z',
              value: 'value23',
            },
          ],
          hasBadge: true,
          id: 'aaa',
          isChecked: false,
          label: 'aaa',
          text: 'aaa',
        },
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              id: 'value2',
              isChecked: false,
              label: 'a',
              text: 'a',
              value: 'value2',
            },
            {
              id: 'value1',
              isChecked: false,
              label: 'c',
              text: 'c',
              value: 'value1',
            },
            {
              children: [
                {
                  id: 'value 3',
                  isChecked: false,
                  label: 'value 3',
                  text: 'value 3',
                  value: 'value 3',
                },
              ],
              id: 'Folder 2',
              isChecked: false,
              label: 'Folder 2',
              text: 'Folder 2',
            },
          ],
          hasBadge: true,
          id: 'bb',
          isChecked: false,
          label: 'bb',
          text: 'bb',
        },
      ]);
    });

    it('converts DDF options to tree data and sorts DESC', () => {
      expect(convertOptions(options, 'desc')).toEqual([
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              children: [
                {
                  id: 'value 3',
                  isChecked: false,
                  label: 'value 3',
                  text: 'value 3',
                  value: 'value 3',
                },
              ],
              id: 'Folder 2',
              isChecked: false,
              label: 'Folder 2',
              text: 'Folder 2',
            },
            {
              id: 'value1',
              isChecked: false,
              label: 'c',
              text: 'c',
              value: 'value1',
            },
            {
              id: 'value2',
              isChecked: false,
              label: 'a',
              text: 'a',
              value: 'value2',
            },
          ],
          hasBadge: true,
          id: 'bb',
          isChecked: false,
          label: 'bb',
          text: 'bb',
        },
        {
          badgeProps: {
            isRead: true,
          },
          children: [
            {
              id: 'value23',
              isChecked: false,
              label: 'z',
              text: 'z',
              value: 'value23',
            },
            {
              id: 'value231',
              isChecked: false,
              label: 't',
              text: 't',
              value: 'value231',
            },
            {
              children: [
                {
                  id: 'zsadas',
                  isChecked: false,
                  label: 'xsd',
                  text: 'xsd',
                  value: 'zsadas',
                },
              ],
              id: 'Folder 2',
              isChecked: false,
              label: 'Folder 2',
              text: 'Folder 2',
            },
            {
              id: 'value12',
              isChecked: false,
              label: 'a',
              text: 'a',
              value: 'value12',
            },
          ],
          hasBadge: true,
          id: 'aaa',
          isChecked: false,
          label: 'aaa',
          text: 'aaa',
        },
      ]);
    });
  });
});
