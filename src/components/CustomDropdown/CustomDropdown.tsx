import React, { ReactElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown as RNEDropdown } from 'react-native-element-dropdown';
import { DropdownOption } from '../../../types/common.type';

interface CustomDropdownProps<T> {
  disabled?: boolean;
  label: string;
  options: DropdownOption<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  selected: DropdownOption<T> | undefined;

  onChange: (item: DropdownOption<T>) => Promise<void> | void;
}

export const CustomDropdown = <T extends string | number>({
  disabled,
  label,
  options,
  placeholder,
  searchPlaceholder,
  selected,
  onChange
}: CustomDropdownProps<T>): ReactElement => {
  const { t } = useTranslation('common');
  const [isFocus, setIsFocus] = useState(false);

  const isDisabled = useMemo(() => !options.length || disabled, [options, disabled]);

  const handleChange = async (item: DropdownOption<T>): Promise<void> => {
    await onChange(item);
    setIsFocus(false);
  };

  return (
    <View>
      <Text
        className={`absolute -top-[10px] z-50 mx-2 text-sm bg-white /*bg-slate-100*/ ${
          isFocus ? 'text-blue-800' : 'text-slate-900'
        } ${isDisabled ? 'text-slate-400' : ''}`}
      >
        {label}
      </Text>
      <RNEDropdown<DropdownOption<T>>
        style={[
          styles.dropdown,
          isFocus && { borderColor: 'blue' },
          { borderColor: isDisabled ? 'grey' : 'black' }
        ]}
        placeholderStyle={[styles.placeholderStyle, { color: isDisabled ? 'grey' : 'black' }]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder || t('customDropdown.placeholder') : '...'}
        searchPlaceholder={searchPlaceholder || `${t('customDropdown.searchPlaceholder')}...`}
        value={selected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        disable={isDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 6,
    paddingHorizontal: 8
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
});
