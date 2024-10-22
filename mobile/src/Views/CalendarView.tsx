import React, {useEffect, useRef, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {
  // Agenda,
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import EventCard from '../Common/component/Card/EventCard';
import {useGetFromApi} from '../Data/Remote/utils/Helpers';
import {useCustomApi} from '../Data/Domain/CustomUseCase';

class EventsPersModel {
  title: string;
  data: eventData[];

  constructor(title: string, data: eventData[]) {
    this.title = title;
    this.data = data;
  }
}

class eventData {
  name: string;
  timing: string | null;
  location: string | null;

  constructor(name: string, timing: string | null, location: string | null) {
    this.name = name;
    this.timing = timing;
    this.location = location;
  }
}

//eventdomainmodel to EventsPersModel
function EventDomainModelToEventsPersModel(
  events: EventDomainModel[],
): EventsPersModel[] {
  let eventsPersModel: EventsPersModel[] = [];
  events.forEach(event => {
    let data: eventData[] = [];
    data.push({
      name: event.title,
      timing: event.time,
      location: event.description,
    });
    if (eventsPersModel.find(e => e.title === event.date)) {
      eventsPersModel
        .find(e => e.title === event.date)
        ?.data.push(new eventData(event.title, event.time, event.description));
    } else {
      eventsPersModel.push(new EventsPersModel(event.date, data));
    }
  });
  return eventsPersModel;
}

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

  const api = useGetFromApi('events/getall', (jsonData: any) => {
    var eventsData: EventDomainModel[] = jsonData.map((event: any) => {
      const startTimeDate = new Date(event.start);
      const startTime = `${startTimeDate.getHours()}:${startTimeDate.getMinutes()}`;
      return {
        title: event.title,
        description: event.location,
        date: event.start,
        time: startTime,
      };
    });
    var test = EventDomainModelToEventsPersModel(eventsData);

    return test;
  });

  const {data, isLoading, load, refresh} = useCustomApi(() => api);

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderView />
      <CalendarProvider
        date={data?.[1]?.title ?? '2024-03-13'}
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
            todayTextColor: theme.colors.error,
            todayBackgroundColor: theme.colors.background,
            dayTextColor: theme.colors.primary,
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
          // closeOnDayPress={false}
        />

        <AgendaList
          sections={data ?? []}
          renderItem={item => (
            <EventCard
              title={item.item.name}
              timing={item.item.timing}
              location={item.item.location}
              isNow={false}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refresh()}
              colors={[theme.colors.primary]}
            />
          }
          // renderSectionHeader={item => <Text>{item.section.title}</Text>}
          scrollToNextEvent
          dayFormat={'yyyy-MM-d'}
          theme={{
            backgroundColor: theme.colors.background,
            calendarBackground: theme.colors.background,
            textSectionTitleColor: theme.colors.primary,
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: theme.colors.primary,
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
