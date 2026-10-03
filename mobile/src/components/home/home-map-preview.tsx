import { StyleSheet, Text, View } from 'react-native';
import { AppColors, IconSize, Radius, Typography } from '@/constants/design-system';
import { AppIcon } from '@/components/ui/app-icon';

export function HomeMapPreview() {
  return (
    <View style={styles.map}>
      <View style={[styles.road, styles.roadOne]} />
      <View style={[styles.road, styles.roadTwo]} />
      <View style={[styles.road, styles.roadThree]} />
      <View style={[styles.road, styles.roadFour]} />
      <View style={[styles.park, styles.parkOne]} />
      <View style={[styles.park, styles.parkTwo]} />
      <View style={styles.river} />
      <View style={[styles.route, styles.routeOne]} />
      <View style={[styles.route, styles.routeTwo]} />
      <View style={[styles.route, styles.routeThree]} />
      <MapPin
        side="left"
        label="출발"
        icon="home"
      />
      <MapPin
        side="right"
        label="도착"
        icon="store"
      />
      <View style={styles.routeDot} />
      <View style={styles.locationButton}>
        <AppIcon
          name="location"
          color={AppColors.muted}
          size={IconSize.action}
        />
      </View>
      <Text style={[styles.mapLabel, { left: 24, bottom: 22 }]}>
        서린초등학교
      </Text>
      <Text style={[styles.mapLabel, { right: 35, top: 36 }]}>한빛공원</Text>
    </View>
  );
}

function MapPin({
  side,
  label,
  icon,
}: {
  side: 'left' | 'right';
  label: string;
  icon: 'home' | 'store';
}) {
  return (
    <View
      style={[
        styles.pinWrap,
        side === 'left' ? styles.startPin : styles.endPin,
      ]}
    >
      <View style={styles.pin}>
        <AppIcon
          name={icon}
          color={AppColors.onPrimary}
          size={IconSize.large}
        />
      </View>
      <Text style={styles.pinLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: AppColors.map,
    borderRadius: Radius.lg,
    height: 210,
    overflow: 'hidden',
    position: 'relative',
  },
  road: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    height: 13,
    position: 'absolute',
    width: '130%',
  },
  roadOne: { left: -50, top: 32, transform: [{ rotate: '33deg' }] },
  roadTwo: { left: -56, top: 120, transform: [{ rotate: '-23deg' }] },
  roadThree: { left: 0, top: 168, transform: [{ rotate: '51deg' }] },
  roadFour: { left: 163, top: -34, transform: [{ rotate: '83deg' }] },
  park: { backgroundColor: '#DCECD8', position: 'absolute' },
  parkOne: { borderRadius: 38, height: 104, right: -16, top: -22, width: 128 },
  parkTwo: {
    borderRadius: 33,
    bottom: -30,
    height: 107,
    left: -35,
    width: 135,
  },
  river: {
    backgroundColor: AppColors.mapBlue,
    height: 42,
    position: 'absolute',
    right: -20,
    top: 84,
    transform: [{ rotate: '49deg' }],
    width: 360,
  },
  route: {
    backgroundColor: AppColors.primary,
    borderRadius: 6,
    height: 6,
    position: 'absolute',
  },
  routeOne: {
    left: 91,
    top: 105,
    transform: [{ rotate: '39deg' }],
    width: 105,
  },
  routeTwo: {
    left: 176,
    top: 155,
    transform: [{ rotate: '7deg' }],
    width: 103,
  },
  routeThree: {
    left: 265,
    top: 170,
    transform: [{ rotate: '31deg' }],
    width: 75,
  },
  pinWrap: { alignItems: 'center', position: 'absolute' },
  startPin: { left: 54, top: 46 },
  endPin: { right: 46, top: 106 },
  pin: {
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  pinLabel: {
    color: AppColors.text,
    fontSize: Typography.label,
    fontWeight: '800',
    marginTop: 5,
  },
  routeDot: {
    backgroundColor: AppColors.primary,
    borderColor: '#CBE0C7',
    borderRadius: 13,
    borderWidth: 4,
    height: 26,
    left: '57%',
    position: 'absolute',
    top: 147,
    width: 26,
  },
  locationButton: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: 18,
    bottom: 16,
    elevation: 2,
    height: 44,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 44,
  },
  mapLabel: { color: '#9BA69B', fontSize: Typography.caption, position: 'absolute' },
});
