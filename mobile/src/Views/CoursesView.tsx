import React from 'react';
import {RefreshControl, View} from 'react-native';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import TablesView from '../Common/component/TableDisplay/TablesView';
import {useGetFromApi} from '../Data/Remote/utils/Helpers';
import {useCustomApi} from '../Data/Domain/CustomUseCase';

function CoursesView(): JSX.Element {
  const api = useGetFromApi('courses/done', (jsonData: any) => {
    return jsonData;
  });

  const {data, isLoading, load, refresh} = useCustomApi(() => api);

  React.useEffect(() => {
    load();
  }, [load]);
  const theme = useTheme();
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderVariantView />
      <TablesView
        data={data ?? {}}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => refresh()}
            colors={[theme.colors.primary]}
          />
        }
      />
    </View>
  );
}

export default CoursesView;
