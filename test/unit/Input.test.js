import Input from '../../src/components/Input.react.js';
import React from 'react';
import {mount, render} from 'enzyme';

test('Input renders', () => {
    const input = render(<Input />);

    expect(input.html()).toBeDefined();
});

describe('Props can be set properly', () => {
    const defaultProps = {
        id: 'input-1',
        value: 'hello, dash',
        style: {backgroundColor: 'hotpink'},
        className: 'input-class',
        type: 'text',
        autoComplete: 'on',
        autoFocus: 'on',
        disabled: true,
        inputMode: 'verbatim',
        list: 'hello',
        max: '2',
        maxLength: '2',
        min: '1',
        minLength: '1',
        multiple: true,
        name: 'input one',
        pattern: '/([A-Z])w+/g',
        placeholder: 'enter text',
        readOnly: 'readonly',
        required: 'required',
        selectionDirection: 'forward',
        selectionEnd: '1',
        selectionStart: '1',
        size: '10',
        spellCheck: 'true',
        step: '2',
        n_blur: 0,
        n_blur_timestamp: -1,
        n_submit: 0,
        n_submit_timestamp: -1,
    };
    const input = mount(<Input {...defaultProps} />);

    test('props are being set', () => {
        expect(input.props()).toBeDefined();
        expect(input.props()).toEqual(defaultProps);
    });

    test('props.id is set as the <input> id', () => {
        // test if id is in the actual HTML string
        const inputTag = input.render().children();
        expect(inputTag.attr('id')).toEqual(defaultProps.id);
    });
    test('props.value is set as the <input> value', () => {
        // test if value is in the actual HTML string
        const inputTag = input.render().children();
        expect(inputTag.attr('value')).toEqual(defaultProps.value);
    });
    test('props.className is set as the <input> CSS class', () => {
        // test if className is actually set on HTML output
        const inputTag = input.render().children();
        expect(inputTag.attr('class')).toEqual(defaultProps.className);
    });
    test('props.multiple is set as an attribute on the input', () => {
        const inputTag = input.render().children();
        expect(inputTag.attr('multiple')).toBeDefined();
        expect(inputTag.attr('multiple')).toEqual('multiple');
    });
    test('props.name is set as an attribute on the input', () => {
        const inputTag = input.render().children();
        expect(inputTag.attr('name')).toBeDefined();
        expect(inputTag.attr('name')).toEqual(defaultProps.name);
    });
    test('props.pattern is set as an attribute on the input', () => {
        const inputTag = input.render().children();
        expect(inputTag.attr('pattern')).toBeDefined();
        expect(inputTag.attr('pattern')).toEqual(defaultProps.pattern);
    });
    test('props.placeholder is set as an attribute on the input', () => {
        const inputTag = input.render().children();
        expect(inputTag.attr('placeholder')).toBeDefined();
        expect(inputTag.attr('placeholder')).toEqual(defaultProps.placeholder);
    });
    test('props.readOnly is set as an attribute on the input', () => {
        const inputTag = input.render().children();
        expect(inputTag.attr('readonly')).toBeDefined();
        expect(inputTag.attr('readonly')).toEqual(defaultProps.readOnly);
    });
    test('props.required is set as an attribute on the input', () => {
        const inputTag = input.render().children();
        expect(inputTag.attr('required')).toBeDefined();
        expect(inputTag.attr('required')).toEqual(defaultProps.required);
    });
    test('props.size is set as an attribute on the input', () => {
        const inputTag = input.render().children();
        expect(inputTag.attr('size')).toBeDefined();
        expect(inputTag.attr('size')).toEqual(defaultProps.size);
    });
    test('props.spellCheck is set as an attribute on the input', () => {
        const inputTag = input.render().children();
        expect(inputTag.attr('spellcheck')).toBeDefined();
        expect(inputTag.attr('spellcheck')).toEqual(defaultProps.spellCheck);
    });
    test('props.step is set as an attribute on the input', () => {
        const inputTag = input.render().children();
        expect(inputTag.attr('step')).toBeDefined();
        expect(inputTag.attr('step')).toEqual(defaultProps.step);
    });
});

describe('Input without setProps() defined', () => {
    let input;
    beforeEach(() => {
        input = mount(<Input value="initial value" />);
    });
    test('Input updates value', () => {
        expect(input.find('input').getNode().value).toEqual('initial value');

        input.find('input').simulate('change', {target: {value: 'new value'}});

        expect(input.find('input').getNode().value).toEqual('new value');
    });
    test('Input does not change state if it rerenders', () => {
        // dash-renderer could rerender a component with it's original
        // props, if dash-renderer is not aware of prop changes (that happen with setState
        // instead of setProps)
        input.setProps({value: 'new value'});

        // expect value prop to not be updated on state, and on the node itself
        expect(input.state().value).toEqual('initial value');
        expect(input.find('input').getNode().value).toEqual('initial value');
    });
});

describe('Input with setProps() defined', () => {
    let mockSetProps, input;
    beforeEach(() => {
        mockSetProps = jest.fn();

        input = mount(<Input value="initial value" setProps={mockSetProps} />);
    });
    test('Input does not use state if setProps is defined', () => {
        expect(input.state()).toBeFalsy();
    });

    test('Input will call setProps with value updates if provided', () => {
        input.find('input').simulate('change', {target: {value: 'new value'}});

        expect(mockSetProps.mock.calls.length).toEqual(1);
        expect(mockSetProps.mock.calls[0][0]).toEqual({value: 'new value'});
    });

    test("Input updates it's value on recieving new props", () => {
        input.setProps({value: 'new value'});

        // expect value prop to not be updated on state, and on the node itself
        expect(input.find('input').getNode().value).toEqual('new value');
    });
});
