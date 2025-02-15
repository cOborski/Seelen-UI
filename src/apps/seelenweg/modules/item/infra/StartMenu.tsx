import { invoke } from '@tauri-apps/api/core';
import { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SeelenCommand, StartWegItem } from 'seelen-core';

import { BackgroundByLayersV2 } from '../../../components/BackgroundByLayers/infra';

import { Selectors } from '../../shared/store/app';

import { RootState } from '../../shared/store/domain';

import { WithContextMenu } from '../../../components/WithContextMenu';
import { DraggableItem } from './DraggableItem';
import { getMenuForItem } from './Menu';

interface Props {
  item: StartWegItem;
}

const startMenuExes = ['SearchHost.exe', 'StartMenuExperienceHost.exe'];

export const StartMenu = memo(({ item }: Props) => {
  const startMenuOpenRef = useRef(false);

  const isStartMenuOpen = useSelector((state: RootState) =>
    startMenuExes.includes(Selectors.focusedApp(state)?.exe || ''),
  );

  const { t } = useTranslation();

  useEffect(() => {
    if (!isStartMenuOpen) {
      setTimeout(() => {
        startMenuOpenRef.current = isStartMenuOpen;
      }, 100);
    } else {
      startMenuOpenRef.current = isStartMenuOpen;
    }
  }, [isStartMenuOpen]);

  return (
    <DraggableItem item={item}>
      <WithContextMenu items={getMenuForItem(t, item)}>
        <div
          className="weg-item"
          onClick={() => {
            if (!startMenuOpenRef.current) {
              invoke(SeelenCommand.SendKeys, { keys: '{win}' });
            }
          }}
          onContextMenu={(e) => e.stopPropagation()}
        >
          <BackgroundByLayersV2 prefix="item" />
          <div className="weg-item-icon">
            <div className="weg-item-icon-start" />
          </div>
        </div>
      </WithContextMenu>
    </DraggableItem>
  );
});
