import React from 'react';
import {View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {Text, useTheme} from 'react-native-paper';
import {
  // Agenda,
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
//TODO OPTIMIZE USEREF CALLBACK MEMO EVERYWHERE + functionality
function CalendarView(): JSX.Element {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, setDate] = React.useState(Date());

  // const onDateChanged = useCallback((date, updateSource) => {
  //   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
  // }, []);

  // const onMonthChange = useCallback(({dateString}) => {
  //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  // }, []);
  const ITEMS = [
    {
      title: '2024-03-10',
      data: [
        {name: 'item 1 - any js object'},
        {name: 'item 1 - any js object'},
      ],
    },
    {
      title: '2024-03-11',
      data: [{name: 'item 2 - any js object', height: 80}],
    },
    {
      title: '2024-03-12',
      data: [{name: 'item 3 - any js object', height: 80}],
    },
    {
      title: '2024-03-13',
      data: [{name: 'item 4 - any js object', height: 80}],
    },
  ];
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderView />
      <CalendarProvider
        date={ITEMS[1]?.title}
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        showTodayButton
        // disabledOpacity={0.6}
        // theme={todayBtnTheme.current}
        theme={{
          todayTextColor: theme.colors.primary,
          todayButtonTextColor: theme.colors.primary,
        }}
        // todayBottomMargin={16}
      >
        <ExpandableCalendar
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // theme={theme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={0}
          hideArrows
          theme={{
            backgroundColor: theme.colors.background,
            calendarBackground: theme.colors.background,
            textSectionTitleColor: theme.colors.primary,
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: theme.colors.background,
            todayTextColor: theme.colors.primary,
            dayTextColor: theme.colors.secondary,
            agendaKnobColor: theme.colors.secondary,
            dotColor: theme.colors.primary,
            selectedDotColor: theme.colors.background,
            arrowColor: theme.colors.primary,
            monthTextColor: theme.colors.primary,
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
          allowShadow={false}
          // markedDates={marked.current}
          // leftArrowImageSource={leftArrowIcon}
          // rightArrowImageSource={rightArrowIcon}
          animateScroll
          // closeOnDayPress={false}
        />

        <AgendaList
          sections={ITEMS}
          renderItem={item => <Text>{item.item.name}</Text>}
          scrollToNextEvent
          // sectionStyle={styles.section}
          dayFormat={'yyyy-MM-d'}
          theme={{
            backgroundColor: theme.colors.background,
            calendarBackground: theme.colors.background,
            textSectionTitleColor: theme.colors.primary,
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: theme.colors.background,
            todayTextColor: theme.colors.primary,
            dayTextColor: theme.colors.primary,
            agendaKnobColor: theme.colors.primary,
            dotColor: theme.colors.primary,
            selectedDotColor: theme.colors.background,
            arrowColor: theme.colors.primary,
            monthTextColor: theme.colors.primary,
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
        />
      </CalendarProvider>
      {/* <Agenda
        items={{
          '2024-03-10': [{name: 'item 1 - any js object'}],
          '2024-03-11': [{name: 'item 2 - any js object', height: 80}],
          '2024-03-12': [{name: 'item 3 - any js object', height: 80}],
          '2024-03-13': [{name: 'item 4 - any js object', height: 80}],
        }}
        loadItemsForMonth={month => {
          console.log('trigger items loading');
        }}
        selected={date}
        renderItem={item => {
          return <Text>{item.name}</Text>;
        }}
        renderEmptyDate={() => {
          return <Text>This is empty date!</Text>;
        }}
        rowHasChanged={(r1, r2) => {
          return r1.name !== r2.name;
        }}
        showClosingKnob={true}
        hideArrows={false}
        hideKnob={false}
        scrollEnabled={true}
        current={date}
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        theme={{
          backgroundColor: theme.colors.background,
          calendarBackground: theme.colors.background,
          textSectionTitleColor: theme.colors.primary,
          selectedDayBackgroundColor: theme.colors.primary,
          selectedDayTextColor: theme.colors.background,
          todayTextColor: theme.colors.primary,
          dayTextColor: theme.colors.primary,
          agendaKnobColor: theme.colors.primary,
          dotColor: theme.colors.primary,
          selectedDotColor: theme.colors.background,
          arrowColor: theme.colors.primary,
          monthTextColor: theme.colors.primary,
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '400',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,

        }}
      /> */}
    </View>
  );
}

export default CalendarView;
