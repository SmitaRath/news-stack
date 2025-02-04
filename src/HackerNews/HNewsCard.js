/* eslint-disable react/prop-types */
import React from 'react'

import {
  Button,
  Menu,
  MenuItem,
  Tag,
  Card,
  Classes,
  H5,
} from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import { useQuery } from 'react-query'
import { formatDistanceToNowStrict } from 'date-fns'

import { hnAxios } from './hnAxios'
import { StyledLink } from './styled'

const getIntentByScore = score => {
  if (score > 200 && score < 500) return 'warning'
  else if (score > 500) return 'danger'
  return 'none'
}

const getNewsById = id => hnAxios.get(`item/${id}.json`)

function HNewsCard({ id }) {
  const { isLoading, isFetching, data, refetch } = useQuery(
    `hn-${id}`,
    () => getNewsById(id),
    {
      enabled: Boolean(id),
    },
  )

  if (isLoading || isFetching) {
    return (
      <Card className={Classes.SKELETON} interactive>
        loading..
      </Card>
    )
  }

  return (
    <Card style={{ borderRadius: 10 }} interactive>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <H5>
          <StyledLink href={data.data.url}>{data.data.title}</StyledLink>
        </H5>
        <Popover2
          content={
            <Menu large>
              <MenuItem icon="refresh" text="refetch" onClick={refetch} />
            </Menu>
          }
        >
          <Button icon="more" minimal />
        </Popover2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tag icon="time" rightIcon="user" interactive round minimal>
          {formatDistanceToNowStrict(data.data.time * 1000)} -{data.data.by}
        </Tag>
        <Tag
          minimal
          round
          icon="flame"
          intent={getIntentByScore(data.data.score)}
        >
          {data.data.score}
        </Tag>
      </div>
    </Card>
  )
}

export default HNewsCard
