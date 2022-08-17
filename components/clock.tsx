import { useSelector, connect } from 'react-redux';
import { useEffect } from 'react';
import { startClock } from '../redux/actions/timerActions';
import {NextPage} from 'next';

interface StateProps {
    timer: any
}

interface DispatchProps {
    startClock: any;
}

interface OwnProps {
    something: string
}

type Props = StateProps & DispatchProps & OwnProps;

const formatTime = (time:any) => {
  return new Date(time).toJSON().slice(11, 19)
}

const Clock:NextPage<Props> = ({timer, startClock, something}) => {

  /*const lastUpdate = useSelector((state:any) => state.timer.lastUpdate);
  const light = useSelector((state:any) => state.timer.light);*/

  useEffect(() => {
    console.log(timer)
    console.log(something);
    startClock();
  },[]);

  return (
    <div className={timer.light ? 'light' : ''}>
      {formatTime(timer.lastUpdate)}
      <style jsx>{`
        div {
          padding: 15px;
          display: inline-block;
          color: #82fa58;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }
        .light {
          background-color: #999;
        }
      `}</style>
    </div>
  )
}

const mapState = (state:any) => ({
    timer: state.timer,
})

export default connect<StateProps, DispatchProps, OwnProps>(mapState,{startClock})(Clock);