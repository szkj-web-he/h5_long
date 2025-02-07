import Button from "@/components/Button";
import { Popup } from "antd-mobile";

interface IProps {
  visible: boolean;
  handleClose: (status: boolean) => void;
}
const RulePop = (props: IProps) => {
  const { visible, handleClose } = props;
  return (
    <Popup
      visible={visible}
      showCloseButton
      onClose={() => {
        handleClose(false);
      }}
      style={{
        zIndex: 1003,
      }}
      destroyOnClose
      bodyClassName="rounded-tl-[16px] rounded-tr-[16px] py-[20px] px-[32px] contain-content"
      onMaskClick={() => {
        handleClose(false);
      }}
      bodyStyle={{
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div className="text-center text-[32px] leading-[40px] font-bold">
        《玩法须知和公约》
      </div>
      <div className="h-[1px] w-calc(100%+32px) bg-[#F0F0F0] ml-[-16px] mr-[-16px] mt-[10px] mb-[14px]" />

      <div className={"h-[50vh] w-full scrollAuto"}>
        <div className="text-[26px] text-[#120F17] leading-[40px] text-justify">
          <strong>1、</strong>
          通过概率获得的随机礼物仅限于在平台内消费，不得以任何形式兑换成法定货币、现金或其他任何具有交换价值的物品或服务，禁止主播、主播所在公会、用户及其他第三方主体进行任何形式的礼物交易，否则平台将严格按照平台规则对相关用户采取相关管理措施，用户应自行对此承担法律责任及相关损失。请用户谨防上当受骗。
        </div>
        <div className="text-[26px] text-[#120F17] leading-[40px] mt-[5px] text-justify">
          <strong>2、</strong>
          本功能玩法不向未成年人开放，未成年人用户请勿参与，平台将通过大数据和实名认证等方式实时跟踪，确保此功能不会被未成年人使用。直播间内主播、主播所在公会以及房间其他用户禁止引导未成年人用户参与本功能玩法，引导未成年人参与本功能玩法将受到平台严厉打击和处罚。
        </div>
        <div className="text-[26px] text-[#120F17] leading-[40px] mt-[5px] text-justify">
          <strong>3、</strong>
          概率礼物是提升房间内互动体验的功能，仅供娱乐交流使用。直播间内主播、主播所在公会以及其他任何主体均不得以任何非法目的与方式(包括但不限于赌博、诈骗等)对其进行使用。
        </div>
        <div className="text-[26px] text-[#120F17] leading-[40px] mt-[5px]">
          <strong>4、</strong>
          禁止使用概率礼物玩法实施任何影响互动公平性的行为，或利用产品BUG等不正当手法参与互动，一旦发生上述情况，平台有权取消发放对应奖励，追回奖励，对情节严重的，平台保留一切追充法律责任的权利。
        </div>
        <div className="text-[26px] text-[#120F17] leading-[40px] mt-[5px]">
          <strong>5、</strong>
          用户不得以任何不正当手段或舞弊的方式参与本功能玩法，一经发现，平台有权取消用户的参与资格，并有权收回用户获取的礼物及权益，同时保留追究其相关法律责任的权利。不正当手段及舞弊行为包括但不限于：下载非官方客户端、使用插件、外挂等非法工具扫码、下载、安装、注册、登录、使用；篡改设备数据；恶意牟利等扰乱平台秩序；使用插件、外挂、系统或第三方工具对本平台及本活动进行干扰、破坏、修改或施加其他影响及平台认为的其他不正当手段。
        </div>
        <div className="text-[26px] text-[#120F17] leading-[40px] mt-[5px]">
          <strong>6、</strong>
          因用户操作不当或用户所在地区网络故障、支付平台网络故障、电信运营商故障、第三方其他平台限制等非平台所能控制的原因导致的用户无法参与活动、或参与失败，平台无需为此承担任何法律责任。
        </div>
        <div className="text-[26px] text-[#120F17] leading-[40px] mt-[5px]">
          <strong>7、</strong>
          平台可能在房间、功能页展示用户账号信息及所获得的随机礼物等信息，您授权并同意平台为此使用并展示您的公开帐号信息(如头像、昵称等)及所获得随机礼物等信息。
        </div>
        <div className="text-[26px] text-[#120F17] leading-[40px] mt-[5px]">
          <strong>8、</strong>
          平台依法运营此功能玩法，如因不可抗力、情势变更，相关政策变动、政府机关指令要求等原因导致本功能玩法调垫、暂停举办或无法进行的，平台有权随时決定修改、暂停、取消或终止本功能玩法，并无需为此承担任何法律责任。
        </div>
      </div>
      <Button
        className="bg-[#8662FB] rounded-[24px] leading-[2em] text-center text-[32px] text-[#FFFFFF] my-[20px]"
        onClick={() => {
          handleClose(true);
        }}
      >
        知道了
      </Button>
    </Popup>
  );
};

export default RulePop;
